export default {
  menu: [
    {
      name: "home",
      title: "首页"
    },
    {
      name: "export",
      title: "导出",
      children: [
        {
          name: "exportCanvas",
          title: "导出图片"
        },
        {
          name: "exportText",
          title: "导出txt"
        },
        {
          name: "exportTable",
          title: "导出table"
        },
        {
          name: "importTable",
          title: "导入table"
        }
      ]
    }
  ]
};
