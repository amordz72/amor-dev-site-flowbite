<template>
  <div class="mt-3 mx-2">
    <div class="row">
      <div class="col-md-4">
        <div class="row">
          <div class="col-3">الحساب</div>
          <div class="col-9">
            <select class="form-select" v-model="cust" @change="get_solde">
              <option selected>اختر حساب</option>
              <option v-for="(item, index) in custs" :key="index" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="d-grid gap-2 mt-2">
          <div
            class="alert alert-info fs-5 text-center rounded-3"
            v-if="final > 0"
          >
            له :
            {{ final }}
          </div>
          <span class="fs-5 alert alert-danger text-center rounded-3" v-else>
            عليه :
            {{ final * -1 }}
          </span>
        </div>
        <div class="containerv">
          <div class="mb-3 row">
            <label for="" class="form-label col-3">بحث عن </label>
            <div class="col-9">
              <select class="form-select" v-model="col_filter">
                <option selected value="2">وصف</option>
                <option value="1">منصرف</option>
                <option value="0">وارد</option>
                <option value="3">تاريخ</option>
              </select>
            </div>
          </div>
          <div class="my-2 px-2 row">
            <label for="" class="col-2">ابحث</label>
            <div class="col-10">
              <input
                type="search"
                class="form-control"
                v-model="txt_se"
                @keyup="my_filter"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 my-4">
              <!-- <button class="btn btn-sm btn-info mx-1">تحديد الكل</button>
              <button class="btn btn-sm btn-success mx-1">تحديد عكس</button> -->
              <button class="btn btn-sm btn-danger ms-1" @click="del_sel">
                حذف_المحدد
              </button>
              <button class="btn btn-sm btn-info ms-1" @click="PrintElem()">
                طباعة
              </button>
            </div>
          </div>

          <nav aria-label="Page navigation mt-4">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link nav-btn" @click="first">الاول</a>
              </li>
              <li class="page-item">
                <a class="page-link nav-btn" @click="next">التالي</a>
              </li>
              <!-- <li class="page-item">
                <a class="page-link nav-btn" @click="prev">السابق</a>
              </li> -->
              <li class="page-item">
                <a class="page-link nav-btn" @click="get_solde">الكل</a>
              </li>
            </ul>
          </nav>
          <div class="">
            <!-- <h5>   <h5>{{ first_p }}</h5>{{ last_p }}</h5> -->
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <table
          class="
            table
            text-center
            table-hover
            fw-bold
            border-primary
            table-borderless
          "
          id="myTable"
        >
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">وارد</th>
              <th scope="col">منصرف</th>
              <th scope="col" class="">وصف</th>
              <th scope="col" class="">تاريخ</th>
              <th scope="col" class="">حدد</th>
              <th scope="col" class="">تحكم</th>
            </tr>
          </thead>
          <tbody class="table-bordered">
            <tr v-for="(item, index) in soldes" :key="index">
              <th scope="row">{{ index + 1 }}</th>

              <td class="text-success">{{ item.in }}</td>
              <td class="text-danger">{{ item.out }}</td>
              <td>{{ item.desc }}</td>
              <td>
                {{
                  new Date(item.createAt * 1000)
                    .toLocaleString()
                    .replace("3991", "2022")
                }}
              </td>
              <td>
                <input
                  type="checkbox"
                  class=""
                  :value="item.id"
                  v-model="ids"
                />
              </td>
              <td class="">
                <button
                  type="button"
                  class="btn btn-sm btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="edit(item, item.id)"
                >
                  Edit
                </button>
                <input
                  type="button"
                  class="btn btn-sm btn-danger mx-1"
                  value="Pulk"
                  @click="del(item.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade font-bold"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="moveModel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="moveModel">تعديل</h5>
            <button
              type="button"
              class="btn-close ms-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <label for="txt_in" class="form-label">الايراد</label>
                <input
                  type="number"
                  class="form-control"
                  name="txt_in"
                  id="txt_in"
                  v-model="move.in"
                  aria-describedby="txt_helpId"
                  placeholder="وارد"
                />
                <small id="txt_helpId" class="form-text text-muted"
                  >المبلغ المستلم</small
                >
              </div>
              <div class="col-6">
                <label for="txt_in" class="form-label">منصرف</label>
                <input
                  type="number"
                  class="form-control"
                  name="txt_in"
                  id="txt_in"
                  v-model="move.out"
                  aria-describedby="txt_helpId"
                  placeholder="وارد"
                />
                <small id="txt_helpId" class="form-text text-muted"
                  >المبلغ منصرف</small
                >
              </div>

              <div class="col-12">
                <div class="mb-3">
                  <label for="txt_desc" class="form-label">وصف</label>
                  <textarea
                    class="form-control"
                    name="txt_desc"
                    id="txt_desc"
                    v-model="move.desc"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              الغاء
            </button>
            <button type="button" class="btn btn-primary" @click="update_move">
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add, update, del,all , get } from "../../firebase/Crud";
import { first, next } from "../../firebase/solde_pg";
import {all_custs, solde } from "../../firebase/soldeCust";

export default {
  data() {
    return {
      owner_id: 0,
      hiddenId: 0,
      tableName: "moves",
      txt_se: "",
      cust: {},
      date: "",
      time: "",
      custs: [],
      soldes: [],
      ids: [],
      move: {
        in: 0,
        out: 0,
        dr: 0,
        owner_id: 0,
        cust_id: 0,
        desc: "",
      },
      col_filter: 2,
      limit: 10,
      orderBy: "creatAt",

      last_p: null,
      first_p: 0,
    };
  },
  computed: {
    final: function () {
      var solde = 0;

      try {
        if (this.soldes.length) {
          for (let index = 0; index < this.soldes.length; index++) {
            const element = this.soldes[index].in - this.soldes[index].out;
            solde += element;
          }
        }
      } catch (error) {
        //  console.error(error);
      }

      return solde;
    },
    dr: function () {
      return this.move.in - this.move.out;
    },
  },
  methods: {
    PrintElem() {
      this.$store.dispatch("set_moves", this.soldes);
      this.$store.dispatch("set_cust", this.cust);
      this.$router.push("/solde-report/");
    },
    get_custs: async function () {

 
try {
   let cs = await all_custs("customers",this.owner_id);
      this.custs = cs;
} catch (error) {
  console.log(error);
}


   
    },
    get_solde: async function () {
      this.soldes = null;
 
     try {
        let cs = await solde('moves',this.cust.id,this.owner_id);
      this.soldes = cs;
      console.log(this.owner_id);
     } catch (error) {
       console.error(error);
     }




   //   this.up(); 
    },
    async del(id) {
      if (confirm("حذف_الحركة هذه !")) {
        await del(id, "moves");
        this.get_solde();
      }
    },
    async del_sel() {
      if (confirm("هل تريد فعلا حذف كل المحدد ")) {
        await this.ids.forEach((element) => {
          del(element, "moves");
        });

        this.get_solde();
      }
    },
    edit(item, id) {
      this.hiddenId = id;
      this.move = item;
    },
    async update_move() {
      this.hiddenId;

      this.move.dr = this.dr;

      await update(this.hiddenId, this.move, "moves");
      this.get_solde();
    },
    async up() {
      var cust = {};
      this.custs = [
        {
          id: "10PU3TEE0auH77EpDcLj",
          date: "",
          desc: "0697301049",
          name: "بشير حفاف",
          time: "",
          createAt: {
            seconds: 1653062215,
            nanoseconds: 205000000,
          },
        },
        {
          id: "1CLg47zKa3ahngjYacl0",
          desc: "",
          time: "",
          name: "الضب المعلمة",
          createAt: {
            seconds: 1652556769,
            nanoseconds: 509000000,
          },
          date: "",
        },
        {
          id: "4GCXgNwis3DeXi6rlIYc",
          date: "",
          desc: "",
          time: "",
          name: "يوسف لمباركي",
          createAt: {
            seconds: 1652388699,
            nanoseconds: 223000000,
          },
        },
        {
          id: "5LwqCIyXI3hjqpYW5qDc",
          desc: "",
          date: "",
          time: "",
          createAt: {
            seconds: 1652894225,
            nanoseconds: 385000000,
          },
          name: "مصطفي",
        },
        {
          id: "9u2lZZXsQli5ytDrTfjV",
          date: "",
          createAt: {
            seconds: 1651414396,
            nanoseconds: 728000000,
          },
          name: "عبد رحمان\t",
          time: "",
          desc: "",
        },
        {
          id: "CKvjCyRoPAtsyQ4KxcpJ",
          name: "بن شعبانة",
          time: "",
          date: "",
          createAt: {
            seconds: 1653327238,
            nanoseconds: 33000000,
          },
          desc: "2800358863",
        },
        {
          id: "GwYVIN9sUlhH9MDi31kw",
          date: "",
          createAt: {
            seconds: 1652894411,
            nanoseconds: 374000000,
          },
          name: "دباخ مهدي ",
          desc: "",
          time: "",
        },
        {
          id: "HL2rWy36cjCP2jMWlJ8u",
          name: "برابح",
          time: "",
          date: "",
          createAt: {
            seconds: 1652461260,
            nanoseconds: 768000000,
          },
          desc: "",
        },
        {
          id: "ISdtSgxMv0tQ0pZFT8dl",
          name: "صالح",
          desc: "",
          date: "",
          time: "",
          createAt: {
            seconds: 1652090646,
            nanoseconds: 176000000,
          },
        },
        {
          id: "O2aSvQCqaFo7QRJnwTgs",
          createAt: {
            seconds: 1652894016,
            nanoseconds: 352000000,
          },
          desc: "",
          date: "",
          time: "",
          name: "فؤاد دباغ",
        },
        {
          id: "P35JQilfSbxLSbTyz8dk",
          createAt: {
            seconds: 1652894454,
            nanoseconds: 605000000,
          },
          desc: "",
          time: "",
          name: "مسعودة واحمد",
          date: "",
        },
        {
          id: "PsD8ucflIG0VvVXv7FzD",
          name: "غيابة عمر",
          date: "",
          time: "",
          createAt: {
            seconds: 1653043152,
            nanoseconds: 249000000,
          },
          desc: "0663365715/029669792",
        },
        {
          id: "RLQJHbll1nowQwqnkmHN",
          name: "الارباح والخسائر",
          desc: "",
          time: "",
          date: "",
          createAt: {
            seconds: 1652859530,
            nanoseconds: 862000000,
          },
        },
        {
          id: "W08B7ktnx6WtrhVkVPIR",
          date: "",
          desc: "تاكسي",
          time: "",
          name: "عدلان",
          createAt: {
            seconds: 1651414391,
            nanoseconds: 527000000,
          },
        },
        {
          id: "Wyx4K1h7JUubfeH51MKg",
          time: "",
          date: "",
          createAt: {
            seconds: 1652071135,
            nanoseconds: 281000000,
          },
          desc: "",
          name: "عمر دردور",
        },
        {
          id: "ZNJJScxkAtPHMxZLC4J9",
          date: "",
          createAt: {
            seconds: 1653305050,
            nanoseconds: 841000000,
          },
          name: "بوليفة خالد",
          desc: "",
          time: "",
        },
        {
          id: "aCTyJqekHEySTj1hLuYO",
          desc: "",
          date: "",
          name: "طاهر",
          time: "",
          createAt: {
            seconds: 1652899589,
            nanoseconds: 742000000,
          },
        },
        {
          id: "aS60sh9svXtq812br7Wv",
          name: "عطية",
          time: "",
          date: "",
          createAt: {
            seconds: 1652894364,
            nanoseconds: 526000000,
          },
          desc: "عطية 0666262204 0542828544/0698879833",
        },
        {
          id: "iqPU0UhD6rSbRaRadNjd",
          name: "بن فرج الله الاب",
          createAt: {
            seconds: 1653068497,
            nanoseconds: 501000000,
          },
          desc: "",
          date: "",
          time: "",
        },
        {
          id: "kavZ7m5NPzeLyLcJtSBs",
          name: "بدر الدين قريشة",
          createAt: {
            seconds: 1652894505,
            nanoseconds: 917000000,
          },
          date: "",
          desc: "",
          time: "",
        },
        {
          id: "vd4DHmFO8ILQnwJfnJtX",
          createAt: {
            seconds: 1652894145,
            nanoseconds: 807000000,
          },
          date: "",
          desc: "",
          time: "",
          name: "مسعودة نعمي",
        },
        {
          id: "w3SgyUVAl3Gj30puiGqM",
          date: "",
          time: "",
          desc: "",
          name: "خديجة",
          createAt: {
            seconds: 1652979396,
            nanoseconds: 824000000,
          },
        },
        {
          id: "x8XPBcBJEZjOP5cV2nkA",
          createAt: {
            seconds: 1653079132,
            nanoseconds: 282000000,
          },
          time: "",
          date: "",
          desc: "",
          name: "عبد رزاق بن دومة",
        },
        {
          id: "z6MXsYG2HCuKmwERfErK",
          createAt: {
            seconds: 1653067716,
            nanoseconds: 963000000,
          },
          time: "",
          desc: "",
          date: "",
          name: "نعوم",
        },
      ];

      await this.custs.forEach((element) => {
        cust = null;

        this.hiddenId = element.id;
        cust = element;

        cust.owner_id = this.$store.state.user.uid;
        update(this.hiddenId, cust, "customers");
      });
    },

    my_filter() {
      var input, filter, table, tr, td, i, txtValue;
      input = this.txt_se;
      filter = input.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[this.col_filter];
        // console.log(td);
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },

    first: async function () {
      this.soldes = [];

      var dd = await first(this.limit, this.cust.id);
      this.soldes = dd.result;
      this.last_p = dd.lastVisible;
    },
    next: async function () {
      this.soldes = [];

      var dd = await next(this.last_p, this.limit, this.cust.id);

      this.soldes = await dd.result;
      this.last_p = dd.lastVisible;
      this.start_p = dd.firstVisible;
    },

    last: async function () {},
  },
  async  mounted() {
   this.owner_id=   await  this.$store.state.user.uid
    // this.get_solde()

  this.get_custs();

  },
};
</script>

<style>
</style>