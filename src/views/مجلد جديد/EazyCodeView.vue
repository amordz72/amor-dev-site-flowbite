<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
          <label for="cbx_command" class="form-label">الامر</label>
          <select
            class="form-control"
            v-model="cbx_command"
            name="cbx_command"
            id="cbx_command"
            @change="setCode()"
          >
            <option value="0">Select ...</option>
            <option :value="cmd.id" v-for="cmd in cmds" :key="cmd.id">
              {{ cmd.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="txt_tbl" class="form-label">الجدول</label>
          <input
            type="text"
            class="form-control"
            v-model="txt_tbl"
            name="txt_tbl"
            id="txt_tbl"
            aria-describedby="help_tbl"
            placeholder=""
          />
        </div>
        <div class="button-group">
          <button type="button" class="btn btn-info" @click="getCode">
            Get
          </button>
        </div>
      </div>
      <div class="col-8">
        <div class="mb-3">
          <label for="" class="form-label h4">الكود :</label>
          <textarea
            class="form-control fw-bold"
            v-model="code"
            rows="11"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      h_id: null,
      isnew: false,
      code: "",
      txt_tbl: "category",
      cbx_command: "",
      cmds: [
        { id: 1, name: "Route" },
        { id: 2, name: "View" },
        { id: 3, name: "Route Link" },
        { id: 4, name: "Crud Js" },
      ],
    };
  },
  computed: {
    tbl_cap() {
      const str2 = this.txt_tbl.charAt(0).toUpperCase() + this.txt_tbl.slice(1);
      return str2;
    },
    t() {
      const str2 = ``;
      return str2;
    },
    crud_js() {
      const str2 = `//mkdir src/firebase/${this.tbl_cap}Crud.vue\n       import app from './index'\n\n\nimport {\n    collection,\n    getDocs,\n    deleteDoc,\n    doc,\n    updateDoc,\n    addDoc,\n    getFirestore\n} from "firebase/firestore";\n\n\n\nconst db = getFirestore(app);\nconst tableName = \"${this.txt_tbl}\";\n\n\nexport async function add(obj) {\n\n    const ${this.txt_tbl}Ref = await addDoc(collection(db, tableName), {\n        ...obj\n    });\n\n    if (${this.txt_tbl}Ref)\n        return true\n    else\n        return false\n\n}\n\nexport async function update(id, obj) {\n\n    const ${this.txt_tbl}Ref = doc(db, tableName, id);\n    await updateDoc(${this.txt_tbl}Ref, {\n        ...obj\n    })\n\n\n\n}\nexport async function del(id) {\n\n    const result = await deleteDoc(doc(db, tableName, id));\n    if (result) {\n        return result\n    } else {\n        return false\n    }\n\n}\n\nexport async function all() {\n\n    const result = []\n\n    const querySnapshot = await getDocs(collection(db, tableName));\n    querySnapshot.forEach((doc) => {\n\n        const id = doc.id;\n\n        result.push({\n            id,\n            ...doc.data()\n        });\n    });\n\n\n    if (result) {\n        return result\n    } else {\n        return false\n    }\n\n}\n\n\nexport async function get(id) {\n    const docRef = doc(db, tableName, id);\n    const docSnap = await getDoc(docRef);\n\n    if (docSnap.exists()) {\n        return docSnap.data();\n    } else {\n\n        return false\n    }\n\n}`;
      return str2;
    },
  },
  methods: {
    setCode() {
      if (this.cbx_command == 1) {
        this.code = `touch src/views/${this.tbl_cap}View.vue
         \rnotepad src/views/${this.tbl_cap}View.vue
         \rnotepad src/router/index.js
         \rimport ${this.tbl_cap}View from "../views/${this.tbl_cap}View.vue";
        \r{
            \rpath: "/${this.txt_tbl}",
            \rname: "${this.tbl_cap}View",
            \rcomponent: ${this.tbl_cap}View,
         \r },
        `;
      } else if (this.cbx_command == 2) {
        this.code = `<template></template>
          
          export default {
            components: {},
            data() {},
           methods: {\n    add: async function () {\n      const r = await add(this.${this.txt_tbl});\n      this.all();\n    },\n\n    update: async function () {\n      await update(this.h_id, this.${this.txt_tbl});\n\n      this.all();\n    },\n    del: async function (id) {\n      del(id);\n      this.all();\n    },\n    all: async function () {\n      this.${this.txt_tbl}s = await all();\n    },\n    get: async function (id) {\n      this.${this.txt_tbl}s = await get(id);\n    },\n\n    edit(po) {\n      this.h_id = po.id;\n      this.${this.txt_tbl}.title = po.title;\n      this.${this.txt_tbl}.body = po.body;\n    },\n  },
            mounted() {
             this.all();
            },
          };


          <style scoped>
          .nav-btn {
            cursor: pointer !important;
          }
          </style>
        `;
      } else if (this.cbx_command == 3) {
        this.code = `<li>\n <router-link class="dropdown-item" to="/${this.txt_tbl}" v-if="!isLogin">${this.tbl_cap}</router-link>\n</li>`;
      } else if (this.cbx_command == 4) {
        this.code = this.crud_js;
      }
    },
    getCode() {
      this.code = this.code.replaceAll("\n", "\\n");
    },
    e() {},
  },
  mounted() {
    //this.
  },
};
</script>

<style>
</style>