<?php


class WallManager
{

    const USER = "labir_wall_user";
    const TOKEN = "labir_wall_token";

    const FORM_USERNAME = "labir_wall_username";
    const FORM_PASSWORD = "labir_wall_password";
    const FORM_EMAIL = "labir_wall_email";

    const FORM_LOGOUT = "labir_wall_logout";

    const SECURE_CREDENTIALS = "labir_secure_credentials";
    const HISTORY = "labir_wall_history";

    const AUTH_NAMESPACE = "thermal-display/v1";
    const AUTH_ROUTE = "/auth-credentials";


    private bool $enabled;


    public function __construct(
        bool $enabled,
    ) {
        $this->enabled = $enabled;

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function getAuthUrl()
    {
        return rest_url(WallManager::AUTH_NAMESPACE . WallManager::AUTH_ROUTE);
    }



    // --- new helper methods for session storage (kept private) ---
    private function setSessionValue(string $key, $value, ?int $ttl = null)
    {
        // pokud je null, smažeme hodnotu ze session
        if ($value === null) {
            if (isset($_SESSION[$key])) {
                unset($_SESSION[$key]);
            }
            return;
        }

        $expires = $ttl ? time() + $ttl : null;
        $_SESSION[$key] = [
            'value' => $value,
            'expires' => $expires
        ];
    }

    private function getSessionValue(string $key)
    {
        if (!isset($_SESSION[$key])) {
            return null;
        }

        $entry = $_SESSION[$key];

        // validace expirace
        if (!empty($entry['expires']) && time() > $entry['expires']) {
            unset($_SESSION[$key]);
            return null;
        }

        return $entry['value'] ?? null;
    }
    // --- end helper methods ---


    // Session management

    public function getUserFromTransient()
    {
        // ...existing code...
        return $this->getSessionValue(WallManager::USER);
    }

    public function storeUserInTransient($user)
    {
        // TTL is 12 hours like before
        $this->setSessionValue(WallManager::USER, $user, 12 * HOUR_IN_SECONDS);
    }

    public function isLoggedIn()
    {
        return !empty($this->getUserFromTransient());
    }


    // Exception management

    private function handleException(Exception $error)
    {
        $this->message = "Chyba přihlašování: " . $error->getMessage();
    }

    public function processHistory()
    {

        if (is_page() && has_block('thermal-display/wall')) {
            // Zpracování historie zde
            $post = get_post();
            if ($post) {

                $this->storeHistory($post);
            }
        }
    }


    // Form management

    public function processForm(
        string $serverUrl,
        string $serverApiRoot
    ) {


        // Pokud je uživatel přihlášený, nedělej nic
        if ($this->isLoggedIn()) {
            return;
        }


        // Pokus se o přihlášení
        try {

            if (! $this->isFormValid()) {
                throw new Exception("Neplatný formulář!");
            }

            $url = $this->getApiUrl($serverUrl, $serverApiRoot);

            // Pokud není URL, něco se posralo
            if (!$url) {
                throw new Exception('Chyba konfigurace serveru.');
            }

            // Sestav tělo požadavku
            $post_body = [
                'user' => $_POST[WallManager::FORM_USERNAME],
                'password' => $_POST[WallManager::FORM_PASSWORD]
            ];

            // Učiň dotaz na API
            $api_response_raw = wp_remote_post($url, [
                'body' => json_encode($post_body),
            ]);

            $api_response_body = json_decode($api_response_raw["body"], true);

            $success = $api_response_body["success"] ?? false;

            $data = $api_response_body["data"] ?? null;

            if (!$success) {
                throw new Exception("Nepodařilo se přihlásit.");
            }

            // Ulož credentials pro následné dotazování identity do session
            $this->registerAuthTransient(
                $post_body["user"],
                $post_body["password"]
            );

            header("Location: " . $_SERVER['REQUEST_URI']);

            // Ulož uživatele do session
            $this->storeUserInTransient($data);
        } catch (Exception $e) {
            $this->handleException($e);
            return;
        }
    }

    public function processLogout()
    {

        if ($this->isLoggedIn()) {

            $logoutRequest = $_POST[WallManager::FORM_LOGOUT];

            if (!empty($logoutRequest) && $logoutRequest == "1") {

                // logout request
                $this->logout();
            } else {
                return;
            }
        }
    }

    private function isFormValid()
    {
        return $this->isFormFieldFilled(WallManager::FORM_USERNAME)
            && $this->isFormFieldFilled(WallManager::FORM_PASSWORD)
            && $this->isFormFieldEmpty(WallManager::FORM_EMAIL);
    }

    private function isFormFieldEmpty(
        string $key
    ) {
        return empty($_POST[$key]);
    }

    private function isFormFieldFilled(
        string $key
    ) {
        return !empty($_POST[$key]);
    }



    /**
     * Sestaví API url přihlašovací routu
     */
    private function getApiUrl(
        string $serverUrl,
        string $serverApiRoot
    ): string {
        return $serverUrl . $serverApiRoot . '?action=login';
    }

    /**
     * Má být ukázán zamčený obsah?
     */
    public function showsContent(): bool
    {

        if (!$this->enabled) {
            return true;
        }

        return $this->isLoggedIn();
    }

    public function logout()
    {
        // odstraníme z session data
        $this->storeUserInTransient(null);
        $this->setSessionValue(WallManager::SECURE_CREDENTIALS, null);
    }


    /**
     * Odešle údaje pro zobrazní baru
     */
    private function getBarData()
    {
        $user = $this->getUserFromTransient();

        if (!$user) {
            return null;
        }

        $result = [
            "login" => $user["login"]["user"],
            "name" => $user["login"]["user"],
            "email" => null,
            "institution" => null,
            "description" => null,
            "isRoot" => false,
            "history" => $this->getHistory()
        ];

        $meta = $user["login"]["meta"];

        if ($meta) {
            $result["name"] = $meta["name"] ?? $user["login"]["user"];
            $result["email"] = $meta["email"] ?? null;
            $result["institution"] = $meta["institution"] ?? null;
            $result["description"] = $meta["description"] ?? null;
            $result["isRoot"] = !empty($meta["is_root"]) ? true : false;
        }

        return $result;
    }


    /**
     * Uloží credentials pro přihlašování v rámci této session
     */
    private function registerAuthTransient(
        string $user,
        string $pass
    ) {
        $this->setSessionValue(WallManager::SECURE_CREDENTIALS, [
            "user" => $user,
            "pass" => $pass,
            "token" => base64_encode($user . ":" . $pass),
            "ip" => $_SERVER['REMOTE_ADDR'] ?? null
        ], 12 * HOUR_IN_SECONDS);
    }


    /** 
     * Přečte uložené credentials s validací IP adresy 
     * - Po přečtení smaže transient
     */
    public function getAuthTransient()
    {

        $data = $this->getSessionValue(WallManager::SECURE_CREDENTIALS);

        if (! $data) {
            return null;
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? null;

        if ($data["ip"] !== $ip) {
            throw new Exception("Bylo manipulováno s IP adresou!");
        }

        // smazání po čtení
        $this->setSessionValue(WallManager::SECURE_CREDENTIALS, null);

        return $data;
    }

    /**
     * Vrátí auth token pro API požadavky
     */
    public function getAuthToken()
    {
        $data = $this->getSessionValue(WallManager::SECURE_CREDENTIALS);
        return $data["token"] ?? null;
    }

    public function storeHistory(
        $post
    ) {
        $this->setSessionValue(WallManager::HISTORY, [
            "name" => $post->post_title,
            "url" => $post->guid,
            "timestamp" => time()
        ], 12 * HOUR_IN_SECONDS);
    }

    public function getHistory()
    {
        return $this->getSessionValue(WallManager::HISTORY);
    }



    public function debug(
        $what
    ) {
        print("<pre>");
        var_dump($what);
        print("</pre>");
    }


    /** 
     * Vytiskne bar do patičky 
     */
    public function printBar()
    {

        if ($this->isLoggedIn()) {


            $shouldDisplayHistory = true;
            if (is_page() && has_block('thermal-display/wall')) {
                $shouldDisplayHistory = false;
            }

            $data = $this->getBarData();
?>
<footer class="labir-wall-bar">

    <section class="labir-wall-section">

        <div class="labir-wall-item">

                        <span class="dashicons dashicons-admin-users"></span>

                        <div><strong><?= esc_html($data["name"]) ?></strong></div>

        </div>

    </section>

    <form method="post" class="labir-wall-section">

        <a
            href="https://discord.gg/mqXsDQfPwX"
            class="labir-wall-item labir-wall-item__active"
            target="_blank"
        >
            <span class="dashicons dashicons-admin-users"></span>
            <span>Discord</span>
        </a>
        
        <button
                type="submit"
                name="<?= WallManager::FORM_LOGOUT; ?>"
                value="1"
                class="labir-wall-item labir-wall-item__active"
        >
            <span class="dashicons dashicons-unlock"></span>
            <span>Odhlásit</span>
        </button>

    </form>

</footer>
<?php
        }
    }
}
