<template>
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold fst-italic text-light">SXYPAG</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/order" class="nav-link" active-class="active">Order</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/transactions" class="nav-link">Transactions</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/supply" class="nav-link">Supply</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link">Products</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <style scoped>
  .nav-link {
    color: white !important;
  }
  .nav-link.active {
    font-weight: bold;
  }
  </style>