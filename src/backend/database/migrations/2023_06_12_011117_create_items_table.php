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
        Schema::create('items', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 200);
            $table->text('description');
            $table->integer('price');
            $table->tinyInteger('category')->unsigned();
            $table->date('expiration');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('admin_id')->unsigned();
            $table->foreign('admin_id')->references('id')->on('admins')
                ->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('items');

    }
};
