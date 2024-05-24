<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKuponsTable extends Migration
{
    public function up()
    {
        Schema::create('kupons', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->boolean('is_claim');
            $table->dateTime('expired_at');
            $table->string('name');
            $table->text('desc');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kupons');
    }
}