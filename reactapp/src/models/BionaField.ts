export default interface BionaField {
    name: string,
    field_type: string,
    display_name: string,
    include_options: Array<string>,
    exclude_options: Array<string>,
    updatable: boolean,
    selectable: boolean,
    filterable: boolean,
    sortable: boolean,
    displayable: boolean,
    nullable: boolean,
}