const fields = [
    {
        type: "text",
        name: "title",
        label: "Title",
        placeholder: "Insert title..."
    },
    {
        type: "text",
        name: "description",
        label: "Description",
        placeholder: "Insert description..."
    },
    {
        type: "options",
        name: "category_id",
        label: "Category",
    },
    {
        type: "switch",
        name: "is_active",
        label: "Product availability",
    }
];

export { fields };