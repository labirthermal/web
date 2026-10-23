<?php


require_once __DIR__ . '/WallManager.php';

add_action("wp_footer", function () {

    $manager = new WallManager(true);
    $manager->processHistory();
    $manager->processLogout();
    $manager->printBar();
    
});



 function labir_dashicons(){
     wp_enqueue_style('dashicons');
 }
 add_action('wp_enqueue_scripts', 'labir_dashicons');



add_action("rest_api_init", function () {

    // Registruj mi routu, která vrátí přihlašovací údaje
    register_rest_route(WallManager::AUTH_NAMESPACE, WallManager::AUTH_ROUTE, [
        "methods" => "POST",
        "permission_callback" => "__return_true",
        "callback" => function ($request) {

            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');

            $token = $request->get_json_params() ?? null;

            $manager = new WallManager(true);


            $credentials = $manager->getAuthTransient();

            if ($credentials) {

                if ($credentials["token"] == $token["token"]) {
                    return new WP_REST_RESPONSE([
                        "success" => true,
                        "data" => $credentials,
                        "stored" => $credentials,
                        "incoming" => $token
                    ], 200);
                }
            }

            return new WP_REST_RESPONSE([
                "success" => false,
                "data" => null
            ], 401);
        }
    ]);
});
