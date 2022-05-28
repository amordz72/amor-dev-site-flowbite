<template>
  <div class="d-grid gap-2 my-4">
    <button type="button" class="btn btn-info" @click="bakup">bakup</button>
    <button type="button" class="btn btn-primary" @click="add">add</button>
    <button type="button" class="btn btn-info" @click="all">bakup</button>
  </div>
</template>

<script>
import { bkup } from "../firebase/db_backup";
import { all } from "../firebase/stories";
//import { add } from "../firebase/Crud";
export default {
  data() {
    return {
      tbls: ["customers", "moves"],
      moves: {},
      tbl: "",
      iid: 1,
    };
  },
  computed: {
    cust_solde() {
      return "s";
    },
  },
  methods: {
    async bakup() {
      var text, str;
      for (let index = 0; index < this.tbls.length; index++) {
        const element = this.tbls[index];
        text = await bkup(element);
        str = JSON.stringify(text);
        var myFile = new File([str], element + ".json", {
          type: "json/plain;charset=utf-8",
        });
        saveAs(myFile);
      }

      /* */
    },

    async all() {
      var r = await all();
      console.log(r );
    },
    async add() {
      var obj = {
        author: this.$store.state.user.uid,
        title: "title_" + this.iid,
      };
     // var r = await add(obj, "stories");
    },
    async tt() {
      // var r=await all()
    },
  },
  mounted() {
    document.querySelector("title").text = "Backup Db" + "";
  },
};
</script>

<style>
</style>