<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12">
        <div class="h1 text-center">
          {{ this.$store.state.postStore.title }}
        </div>
        <div
          class="alert"
          :class="{ 'alert-info': msg, 'alert-danger': hasError }"
        ></div>
      </div>

      <div class="col-md-4">
        <div class="mb-3">
          <label for="txt_title" class="form-label">Title :</label>
          <input
            type="text"
            class="form-control is-valid|is-invalid"
            name="txt_title"
            id="txt_title"
            v-model="post.title"
          />
          <div class="invalid-feedback">Validation message</div>
        </div>
        <div class="mb-3">
          <label for="txt_title" class="form-label">Description :</label>
          <input
            type="text"
            class="form-control is-valid|is-invalid"
            name="txt_title"
            id="txt_title"
            v-model="post.body"
          />
          <div class="invalid-feedback">Validation message</div>
        </div>

        <button type="submit" class="btn btn-info" @click="add_post">
          Submit
        </button>
      </div>
      <div class="col-md-8">
        <table class="table table-responsive table-hover text-center">
          <thead class="table-dark">
            <tr>
              <th>Title</th>
              <th>body</th>
              <th class="text-danger">Action</th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr v-for="p in posts" :key="p.id">
              <td>{{ p.title }}</td>
              <td>{{ p.body }}</td>
              <td>
                <button
                  class="btn btn-info"
                  @click.stop.prevent="edit(p)"
                  data-bs-toggle="modal"
                  data-bs-target="#update_model"
                >
                  update
                </button>
                <button class="btn btn-danger" @click.stop.prevent="del(p.id)">
                  del
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- up -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="update_model"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <label for class="form-label">Title</label>
              <input type="text" class="form-control" v-model="post.title" />
            </div>
            <div class="mb-2">
              <label for class="form-label">Body</label>
              <input type="text" class="form-control" v-model="post.body" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="update"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- e-up -->
  </div>
</template>

<script>
import { add, update, del, all, get } from "../firebase/postCrud";

export default {
  components: {},
  data() {
    return {
      h_id: null,
      post: {
        title: "",
        body: "",
      },
      posts: [],
      msg: "",
      hasError: false,
      limit: 1,
      order: "title",
      first_p: "",
      last_p: "",
    };
  },
  methods: {
    add: async function () {
      const r = await add(this.post);
      this.all();
    },

    update: async function () {
      await update(this.h_id, this.post);

      this.all();
    },
    del: async function (id) {
      del(id);
      this.all();
    },
    all: async function () {
      this.posts = await all();
    },
    get: async function (id) {
      this.posts = await get(id);
    },

    edit(po) {
      this.h_id = po.id;
      this.post.title = po.title;
      this.post.body = po.body;
    },
  },
  mounted() {
    this.all();
  },
};
</script>
 

<style scoped>
.nav-btn {
  cursor: pointer !important;
}
</style>