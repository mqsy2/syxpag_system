<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand fw-bold fst-italic text-light" href="#">SXYPAG</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Order</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Transactions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Supply</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Products</a>
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