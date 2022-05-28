<template>
  <div class="home pt-5">
    <h2 class="text-center">العملاء</h2>
    <div class="row">
      <div class="col-md-4">
        <div class="w-75 mx-auto">
          <div class="mb-3">
            <label for="" class="form-label">الحساب :</label>

            <input
              type="text"
              class="form-control"
              v-model="customer.name"
              aria-describedby="customerH"
              placeholder="ادخل اسم الحساب"
            />
            <small id="customerH" class="form-text text-muted">الحساب </small>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">وصف :</label>

            <input
              type="text"
              class="form-control"
              v-model="customer.desc"
              aria-describedby="customerDesc "
              placeholder="ملاحظة"
            />
          </div>
          <button
            type="button"
            class="btn btn-info"
            @click.stop="add"
            v-if="is_new"
          >
            حفظ
          </button>
          <button
            type="button"
            class="btn btn-warning"
            @click.stop="updated"
            v-if="!is_new"
          >
            تعديل
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click.stop="del"
            v-if="!is_new"
          >
            حذف
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click.stop="clear"
            v-if="!is_new"
          >
            الغاء
          </button>
        </div>

        <nav aria-label="Page navigation mt-4">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link nav-btn" @click="first">الاول</a>
            </li>
            <li class="page-item">
              <a class="page-link nav-btn" @click="next">التالي</a>
            </li>

            <li class="page-item">
              <a class="page-link nav-btn" @click="all_cust">الكل</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-md-8">
        <table class="table table-hover table-i table-responsive">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>الحساب</th>
              <th>وصف</th>
              <th>تعديل</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cust, index) in customers" :key="index">
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ cust.name }}</td>
              <td>{{ cust.desc }}</td>
              <td>
                <input
                  type="button"
                  value="Edit"
                  class="btn btn-sm btn-warning d-block"
                  @click="edit(cust, cust.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { add, update, del, all, get } from "../../firebase/Crud";
import { check_unique } from "../../firebase/customers/validate";
import { next, first } from "../../firebase/customers/paginate";

export default {
  components: {},
  data() {
    return {
      is_new: true,
      hiddenId: 0,
      tableName: "customers",
      date: "",
      time: "",
      customers: [],
      Error: [],
      customer: {
        name: "", //

        owner_id: "", //

        desc: "",
      },
      limit: 5,
      orderBy: "creatAt",

      last_p: null,
    };
  },
  computed: {
    dr: function () {
      return "this.customer.in - this.customer.out";
    },
    my_Date: function () {
      return "date";
    },
  },
  methods: {
    add: async function () {
      // //

      let v = await check_unique(this.tableName, this.customer.name);

      if (v.length > 0) {
        alert("الحساب موجود");
        return;
      } else {
        this.customer.owner_id = this.$store.state.user.uid;

        await add(this.customer, this.tableName);
        this.clear();
      }
    },
    clear: function () {
      this.customer.name = "";
      this.customer.desc = "";

      this.first();
      this.is_new = true;
      //   this.all_cust();
    },
    async all_cust() {
      this.customers = await all("customers");
    },
    edit(cust, id) {
      this.hiddenId = id;
      this.customer.name = cust.name;
      this.customer.desc = cust.desc;
      this.is_new = false;
    },
    async updated() {
     
  
      await update(this.hiddenId, this.customer, this.tableName);
      this.clear();
      newCust={}
      
    },

    async first() {
      this.customers = [];

      var dd = await first(this.limit);
      this.customers = dd.result;
      this.last_p = dd.lastVisible;
    },
    async next() {
      this.customers = [];

      var dd = await next(this.last_p, this.limit);

      this.customers = await dd.result;
      this.last_p = dd.lastVisible;
    },

    validate_unique: function (name) {},
    top: function () {},

    del: async function () {
      if (confirm("حذف_الحركة هذه !")) {
        del(this.hiddenId, this.tableName);
        this.clear(); //
      }
    },
  },
  mounted() {
    this.clear(); //
    document.querySelector("title").text = "Dayne - Customer";
  },
  created() {},
};
</script>
