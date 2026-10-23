<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$enabled = !empty($attributes['enabled']);
$prompt_title = !empty($attributes['promptTitle']) ? $attributes['promptTitle'] : 'Pro přihlášené';
$prompt_content = !empty($attributes['promptText']) ? $attributes['promptText'] : null;

$serverUrl = !empty($attributes['serverUrl']) ? rtrim($attributes['serverUrl'], '/') : null;
$serverApiRoot = !empty($attributes['serverApiRoot']) ? '/' . trim($attributes['serverApiRoot'], '/') . "/" : '/api/';


$manager = new WallManager(
    $enabled
);

$manager->processLogout();

$manager->processForm( $serverUrl, $serverApiRoot );



$shows_content = $manager->showsContent();

?>
<div <?= get_block_wrapper_attributes(); ?>>
    <?php if ($shows_content) : ?>
        <?= $content; ?>
    <?php else : ?>
        <div class="labir-wall-frontend">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clip-rule="evenodd" />
            </svg>


            <h2 class="labir-wall-frontend-title"><?= $prompt_title; ?></h2>
            <?php if ($prompt_content): ?>
                <div class="labir-wall-frontend-content">
                    <?= $prompt_content; ?>
                </div>
            <?php endif; ?>
            <!-- ...ikona, titulek, text... -->
            <form method="post" class="labir-wall-login-form">
                <input type="text" name="labir_wall_username" placeholder="Uživatelské jméno" required>
                <input type="password" name="labir_wall_password" placeholder="Heslo" required>
                <input type="email" name="labir_wall_email">
                <button type="submit" name="labir_wall_login">Přihlásit</button>
            </form>
            <?php if ($message): ?>
                <div class="labir-wall-login-message"><?= esc_html($message); ?></div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>