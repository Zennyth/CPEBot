<template>
  <div class="home">
    <b-col>
      <section>
        <h1>Card</h1>
        <Card variant="glass">
          <template v-slot:header>
            <p>2020 Earnings</p>
            <b-icon icon="arrow-repeat" variant="text-primary" scale="1.25"></b-icon>
          </template>
          <template>
            <p>Weekly Earnings</p>
            <h4>$ 8.120.09</h4>
          </template>
        </Card>
      </section>

      <section>
        <h1>Glass Icon</h1>
        <Card variant="colorfull">
          <template>
            <div class="px-0 d-flex flex-row justify-content-between">
              <div class="px-0">
                <p>Good morning</p>
                <h4>Mathis Figuet</h4>
              </div>
              <div  class="px-0 w-auto d-flex flex-row justify-content-center align-items-center">
                <Icon icon="plus" :scale="2" variant="text-secondary"></Icon>
              </div>
            </div>
          </template>
        </Card>
      </section>

      <section>
        <h1>Buttons</h1>
        <Card variant="primary">
          <template>
            <div class="px-0 d-flex mb-2 align-items-center">
              <b-button variant="outline-primary" class="mr-2">Hello there</b-button>
              <b-button variant="primary" class="mr-2">Hello there</b-button>
              <p class="ml-2">Primary</p>
            </div>
            <div class="px-0 d-flex mb-2 align-items-center">
              <b-button variant="outline-secondary" class="mr-2">Hello there</b-button>
              <b-button variant="secondary" class="mr-2">Hello there</b-button>
              <p class="ml-2">Secondary</p>
            </div>
          </template>
        </Card>
      </section>

      <section>
        <h1>Carousel</h1>
        <Card variant="glass">
          <template>
            <b-carousel
              id="carousel-1"
              :interval="0"
              controls
              indicators
              img-width="1024"
              img-height="480"
              style=""
            >
              <!-- Slide with blank fluid image to maintain slide aspect ratio -->
              <b-carousel-slide img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>

              <b-carousel-slide img-blank img-alt="Blank image">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                  a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                </p>
              </b-carousel-slide>
            </b-carousel>
          </template>
        </Card>
      </section>
    </b-col>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    Card: () => import("@/components/shared/Card"),
    Icon: () => import("@/components/shared/Icon"),
  }
}
</script>
