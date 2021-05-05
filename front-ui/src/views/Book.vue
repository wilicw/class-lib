<template>
  <div>
    <v-snackbar v-model="popup" :color="color" timeout="5000">
      {{ msg }}
    </v-snackbar>
    <br />
    <v-container>
      <v-card class="pa-5">
        <v-row>
          <v-col xs="12" sm="4">
            <v-img :src="book.imageUrl"></v-img>
          </v-col>
          <v-col xs="12" sm="8">
            <v-card-text>
              <p class="headline">{{ book.title }}</p>
              <p>{{ book.introduction }}</p>
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="!book.status"
                    color="green"
                    dark
                    large
                    class="my-8"
                    v-bind="attrs"
                    v-on="on"
                    >借書
                  </v-btn>
                  <v-btn
                    v-else
                    color="blue darken-3"
                    dark
                    large
                    class="my-8"
                    v-bind="attrs"
                    v-on="on"
                    >還書</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">輸入資料</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="學號 （ex: 0706200） *"
                              required
                              v-model="username"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="生日 （ex: 1010） *"
                              type="password"
                              required
                              v-model="password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                    <small>* 為必填資訊</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="dialog = false">
                      取消
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="
                        dialog = false;
                        order_return();
                      "
                    >
                      送出
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">姓名</th>
                      <th class="text-left">借出日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="record in records" :key="record.name">
                      <td>{{ record.user_id }}</td>
                      <td>{{ record.createdAt }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "book_card",
  data: () => ({
    book: {},
    records: [],
    dialog: false,
    username: "",
    password: "",
    popup: null,
    color: null,
    msg: null,
  }),
  created: async function () {
    const id = this.$route.params.id;
    if (id) {
      try {
        const result = (await api.get_book_by_id(id)).data;
        this.book = result.book;
        this.records = result.record;
      } catch (error) {
        this.$route.push("/");
      }
    } else {
      this.$route.push("/");
    }
  },
  methods: {
    order_return: async function () {
      if (this.username == "" || this.password == "") {
        this.popup_msg("red", "填東西阿！！！");
        return;
      }
      try {
        if (this.book.status) {
          await api.return_book(this.book.id, this.username, this.password);
        } else {
          await api.order_book(this.book.id, this.username, this.password);
        }
        this.popup_msg("success", "借還書成功");
        this.book.status = !this.book.status;
      } catch (error) {
        this.popup_msg("error", error);
        console.log(error);
      }
    },
    popup_msg: function (color, msg) {
      this.color = color;
      this.msg = msg;
      this.popup = true;
    },
  },
};
</script>