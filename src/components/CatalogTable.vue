<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import TextRowActions from "@/components/TextRowActions";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("texts");
import { SET_FETCHED_TEXTS } from "./../store/action-types";

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    TextRowActions,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    sortOrder: {
      type: Array,
      default() {
        return [
          {
            field: "textId",
            direction: "asc",
          },
        ];
      },
    },
    appendParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  render(h) {
    return h(
      "div",
      {
        class: { "table-container": true },
      },
      [
        this.renderPaginationTop(h),
        this.renderVuetable(h),
        this.renderPagination(h),
      ]
    );
  },
  methods: {
    ...mapActions([SET_FETCHED_TEXTS]),
    renderVuetable(h) {
      return h("vuetable", {
        ref: "vuetable",
        props: {
          apiUrl: this.apiUrl,
          fields: this.fields,
          paginationPath: "",
          perPage: 4,
          sortOrder: this.sortOrder,
        },
        on: {
          "vuetable:pagination-data": this.onPaginationData,
          "vuetable:load-success": this.onLoadSuccess,
        },
        scopedSlots: {
          actions: function (props) {
            return h("text-row-actions", {
              props: {
                rowData: props.rowData,
              },
            });
          },
        },
      });
    },
    renderPagination(h) {
      return h(
        "div",
        {
          class: {
            "vuetable-pagination": true,
            ui: true,
            basic: true,
            segment: true,
            grid: true,
          },
        },
        [
          h("vuetable-pagination-info", {
            ref: "paginationInfo",
            props: {
              infoTemplate: "Mostrando {from} a {to} de {total} textos",
            },
          }),
          h("vuetable-pagination", {
            ref: "pagination",
            on: {
              "vuetable-pagination:change-page": this.onChangePage,
            },
          }),
        ]
      );
    },
    renderPaginationTop(h) {
      return h(
        "div",
        {
          class: {
            "vuetable-pagination": true,
            ui: true,
            basic: true,
            segment: true,
            grid: true,
          },
        },
        [
          h("vuetable-pagination-info", {
            ref: "paginationInfoTop",
            props: {
              infoTemplate: "Mostrando {from} a {to} de {total} textos",
            },
          }),
          h("vuetable-pagination", {
            ref: "paginationTop",
            on: {
              "vuetable-pagination:change-page": this.onChangePage,
            },
          }),
        ]
      );
    },
    formatRawContent(value) {
      return value ? value.substring(0, 30) + "..." : "Sin contenido";
    },
    formatGrade(value) {
      return value + "°";
    },
    formatStatus(value) {
      return value === "processed" ? "Procesado" : "No procesado";
    },
    onPaginationData(paginationData) {
      this.$refs.paginationTop.setPaginationData(paginationData);
      this.$refs.paginationInfoTop.setPaginationData(paginationData);

      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onLoadSuccess(response) {
      this[SET_FETCHED_TEXTS](response.data.data);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
  },
};
</script>
