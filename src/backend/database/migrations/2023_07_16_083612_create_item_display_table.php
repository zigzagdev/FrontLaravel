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
        Schema::create('item_display', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->boolean('is_display')->default(true)->comment('trueだとアイテム表示させる');
            $table->unsignedBigInteger('item_id')->unsigned();
            $table->foreign('item_id')->references('id')->on('items')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->date('expired_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_display');
    }
};
