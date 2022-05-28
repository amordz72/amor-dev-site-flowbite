<template>
  <div class="row pt-5 px-2">
    <div class="d-flex justify-content-between">
      <div class="start">
        <h5 class="text-center">
          <span
            :class="cust_solde > 0 ? 'text-dark' : 'text-danger'"
            class="px-2 mx-2"
          >
            {{ cust.name }}
          </span>
          <span
            v-text="cust_solde > 0 ? ' يعطى_له ' : ' يستلم_منه '"
            class="px-2"
          ></span>

          <span
            class="badge px-2"
            :class="cust_solde > 0 ? 'bg-info' : 'bg-danger'"
          >
            {{ cust_solde }}
          </span>
        </h5>
      </div>
      <div class="btn-printer" id="btn-print">
        <button type="button" class="btn btn-outline-info" @click="print">
          Print
        </button>
        <!-- <label for="print_mode">Hide</label>  <input type="checkbox" id="print_mode" class="form-check d-inline mx-4"  @click="print_mode"> -->
      </div>
      <div class="end h4">
        <strong class="text-success"> <span>المستلم</span> {{ cust_in }}</strong
        ><br />
        <strong class="text-danger">
          <span>المنصرف</span> {{ cust_out }}</strong
        >
      </div>
    </div>

    <table class="table text-center">
      <thead>
        <tr class="table-dark">
          <th scope="col">#</th>
          <th scope="col">وارد</th>
          <th scope="col">منصرف</th>
          <th scope="col">ملاحظة</th>
          <th scope="col">تاريخ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(move, index) in moves"
          :key="index"
          :class="move.out > 0 ? 'table-danger' : 'table-info'"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td class="">{{ move.in }}</td>
          <td class="">{{ move.out }}</td>
          <td class="">{{ move.desc }}</td>
          <td>
            {{
              new Date(move.createAt * 1000)
                .toLocaleString()
                .replace("3991", "2022")
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      moves: [],
      cust: {},
    };
  },
  computed: {
    cust_solde() {
      let s = 0;
      this.moves.forEach((element) => {
        s += element.in - element.out;
      });
      return s;
    },
    cust_in() {
      let s = 0;
      this.moves.forEach((element) => {
        s += element.in;
      });
      return s;
    },
    cust_out() {
      let s = 0;
      this.moves.forEach((element) => {
        s += element.out;
      });
      return s;
    },
  },
  methods: {
    print() {
      document.querySelector("#sb").classList.add("d-none");
      document.querySelector("#navbar").classList.add("d-none");
      document.querySelector("#btn-print").classList.add("d-none");

      print();
      document.querySelector("#sb").classList.remove("d-none");
      document.querySelector("#navbar").classList.remove("d-none");
      // document.querySelector("#btn-print").classList.remove('d-none') ;

      router.push("/solde");
    },
  },
  mounted() {
    this.moves = this.$store.state.moves;
    this.cust = this.$store.state.cust;
    document.querySelector("title").text = "رصيد - " + this.cust.name;
  },
};
</script>

<style>
</style>