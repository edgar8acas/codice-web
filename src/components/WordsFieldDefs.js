import ImageUrlTableField from './ImageUrlTableField';

function urlFormatter(value) {
  return value ? value.substring(0, 60) + "..." : "Sin url"
};

export default [
  {
    title: "Id",
    name: "wordId",
    sortField: "wordId",
  },
  {
    title: "Palabra",
    name: "word",
    sortField: "word",
  },
  {
    title: "Definición",
    name: "definition",
    sortField: "definition",
  },
  {
    title: "Tipo",
    name: "type",
    sortField: "type",
  },
  {
    title: "Imagen",
    name: ImageUrlTableField,
    sortField: 'imageUrl',
  },
  {
    title: "Video",
    name: "videoUrl",
    sortField: 'videoUrl',
    formatter: urlFormatter
  },
  "actions",
];
