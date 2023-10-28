<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 100);
            $table->string('email', 100)->unique();
            $table->string('password', 255)->unique();
            $table->string('null', 80)->unique()->nullable()->default(null);
            $table->boolean('is_admin')->default(true)->comment('trueだとadmin権限を持つ');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
