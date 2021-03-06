<template>
  <div>
    <section class="central">
      <div class="details">
        <div class="side-card">
          <h2>Instrucciones</h2>
          <p class="instructions">
            Aquí se muestran todas las ocurrencias de las palabras esenciales
            obtenidas por el procesamiento.
          </p>
          <p class="instructions">
            Al seleccionar una ocurrencia se mostrarán las definiciones disponibles en la sección Detalles de palabra.
          </p>
          <p class="instructions">
            Es recomendable que cada ocurrencia tenga al menos una definición asociada.
          </p>
          <symbology :items="contentSymbology"/>
          <button class="ui button primary" @click="save" v-if="!processed"
            >Guardar ocurrencias</button
          >
        </div>
      </div>
      <div class="template">
        <h2 class="section-title">{{ text.title }}</h2>
        <text-content
          class="text-content"
          :isProcessing="true"
          :text="text"
          v-if="showTextContent"
        ></text-content>
      </div>
      <div class="side-info">
        <word-details class="word-details" :occurrence="occurrence">
        </word-details>
        <create-word></create-word>
      </div>
    </section>
  </div>
</template>

<script>
import WordDetails from "@/components/WordDetails";
import CreateWord from "@/components/CreateWord";
import TextContent from "@/components/TextContent";
import Symbology from "@/components/Symbology";
import { mapState, mapActions } from "vuex";

import { colors } from "@/assets/colors"

import {
  GET_TEXT_BY_ID,
  PROCESS_TEXT,
  SAVE_PROCESSED_TEXT,
} from "../store/action-types";

export default {
  components: {
    CreateWord,
    WordDetails,
    TextContent,
    Symbology
  },
  data() {
    return {
      textId: this.$route.params.id,
      loading: false,
      occurrence: {},
      showTextContent: false,
      contentSymbology: [
        { color: colors.GREEN, description: 'Ocurrencias con significado' },
        { color: colors.ORANGE, description: 'Ocurrencias sin significado' }
      ]
    };
  },
  computed: {
    ...mapState("texts", ["texts"]),
    ...mapState(["template"]),
    text() {
      return this.texts.find((text) => text.textId === Number(this.textId));
    },
    processed() {
      return this.text.status === "processed" ||
        this.text.status === "incomplete"
        ? true
        : false;
    },
  },
  async mounted() {
    await this[GET_TEXT_BY_ID](this.textId);
    await this[PROCESS_TEXT](this.textId);
    this.showTextContent = true;
  },
  methods: {
    ...mapActions("process", [PROCESS_TEXT, SAVE_PROCESSED_TEXT]),
    ...mapActions("texts", [GET_TEXT_BY_ID]),
    isEmpty(obj) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    },
    async save() {
      await this[SAVE_PROCESSED_TEXT](this.textId);
      this.$router.replace({ name: "Texts" });
    },
    changeOccurrence(start) {
      this.occurrence = this.template.occurrences.find(
        (o) => o.start === start
      );
    },
    setDefault() {
      this.$store.dispatch("setDefault");
    },
  },
};
</script>

<style lang="scss">
.content {
  height: 800px;
}
.words {
  max-width: 300px;
  display: flex;
  flex-flow: row wrap;
  border: 1px solid blue;

  > div {
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }
}

.instructions {
  text-align: left;
  font-size: 1.2rem;
}

[class~="conflicts"] > div {
  border: 1px solid red;

  &:hover {
    background-color: red;
    color: white;
  }
}

[class~="ready"] > div {
  border: 1px solid green;

  &:hover {
    background-color: green;
    color: white;
  }
}

.btn-primary {
  display: inline-block;
  text-transform: uppercase;
  background-color: #42b983;
  color: white;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 0.9em;
}

.btn-primary:link {
  color: white;
}

.btn-primary:visited {
  color: white;
}

.btn-primary:hover {
  background-color: #26694b;
}
</style>
