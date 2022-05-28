<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-8 mx-auto mt-5 text-black fw-bold">
        <!--Customer-->
        <form class="was-validated">
          <div class="mb-2 row">
            <label for="" class="form-label col-2">العميل</label>
            <div class="col-10">
              <select class="form-select" required aria-label="select example" v-model="move.cust_id">
                <option value="">Open this select menu</option>
                <option v-for="(item, index) in custs" :key="index" :value="item.id" class="fw-bold">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="invalid-feedback">Example invalid select feedback</div>
          </div>
        </form>
        <!--in-->
        <div class="mb-3 row">
          <label for="txt_in" class="col-sm-2 col-form-label">وارد</label>
          <div class="col-sm-10">
            <input type="number" step="10" class="form-control" name="txt_in" id="txt_in" placeholder="In"
              v-model="move.in" />
          </div>
        </div>
        <!--out-->

        <div class="mb-3 row">
          <label for="txt_in" class="col-sm-2 col-form-label">منصرف</label>
          <div class="col-sm-10">
            <input type="number" step="10" class="form-control" placeholder="Out" v-model="move.out" />
          </div>
        </div>
        <!-- dr -->
        <div class="mb-3 row d-none">
          <label for="txt_in" class="col-sm-2 col-form-label">المبلغ</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" placeholder="Dr" v-model="dr" />
          </div>
        </div>
        <!-- desc -->
        <div class="mb-3 row">
          <label for="txt_in" class="col-sm-2 col-form-label">الوصف</label>
          <div class="col-sm-10">
            <textarea class="form-control" placeholder="Description" v-model="move.desc" />
          </div>
        </div>
        <!-- btn -->
        <div class="mb-3 row">
          <div class="col-sm-10">
            <input type="button" class="btn btn-info" value="Add" @click="add" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add, update, del, all, get } from "../../firebase/Crud";

export default {
  components: {},
  data() {
    return {
      tableName: "moves",
      custs: [],
      Error: [],
      custumers: [],
      move: {
        in: 0,
        out: 0,
        dr: 0,

        cust_id: 0,
        desc: "",
      },
      alerts: {
        cust_id: "",
      },
    };
  },
  computed: {
    dr: function () {
      return this.move.in - this.move.out;
    },
  },
  methods: {
    get: async function () {
      this.moves = await all(this.tableName, "date");
    },
    get_custs: async function () {
      let cs = await all("customers");

      this.custs = cs;
    },

    add: async function () {
      if (this.move.cust_id == "") {
        this.alerts.cust_id = "Enter Customer";

        return;
      }
      this.move.dr = this.dr;

      await add(this.move, this.tableName);
      this.clear();
    },
    clear: function () {
      this.move.in = 0;
      this.move.out = 0;
      this.move.desc = "";
      this.get();
    },
    top: function () { },
  },
  mounted() {
    this.clear();
    this.get_custs();
    document.querySelector("title").text = "Dayne - All";
  
  },
};
</script>

<style scoped>
.nav-btn {
  cursor: pointer !important;
}
</style>