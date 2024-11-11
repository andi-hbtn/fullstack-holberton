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
        type: "number",
        name: "price",
        label: "Price",
        placeholder: "Insert price..."
    },
    {
        type: "options",
        name: "category_id",
        label: "Category",
    },
    {
        type: "options",
        name: "author_id",
        label: "Author",
    },
    {
        type: "switch",
        name: "is_active",
        label: "Book availability",
    },
    {
        type:"file",
        name:"image",
        label:"Upload Image"
    }
];

export { fields };