<script setup>
import "./Navbar.scss";
</script>

<template>
  <div class="navbar">
    <div class="wrapper">
      <div class="left">
        <router-link to="/" class="link">
          <img src="../../../public/img/logo.png" alt="" />
        </router-link>
        <router-link to="/" class="link">
          <span class="logoName">Employee Manger Application</span>
        </router-link>
      </div>
      <div class="right">
        <router-link to="/" class="link">
          <span class="navItem">Home</span>
        </router-link>
        <router-link to="/add" class="link">
          <span class="navItem">Add Employee</span>
        </router-link>
        <div class="auth">
          <img src="../../../public/img/no dp img.png" alt="" />
          <span>Saurabh</span>
        </div>
      </div>
    </div>
  </div>
</template>
