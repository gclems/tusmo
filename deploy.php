<?php

namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'git@github.com:gclems/tusmo.git');
set('http_user', 'grcl3320');
set('writable_mode', 'chown');
set('writable_use_sudo', false);
set('keep_releases', 5);
// releases directories will be named with timestamps
set('release_name', function () {
    return date('YmdHis');
});

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

task('npm_build', function () {
    run('cd {{release_path}} && npm i');
    run('cd {{release_path}} && npm run build');
})->desc('Build assets');
after('deploy:vendors', 'npm_build');

// Hosts

host('silicate.o2switch.net')
    ->set('remote_user', 'grcl3320')
    ->set('deploy_path', '~/tusmo');

// Hooks

after('deploy:failed', 'deploy:unlock');
