export interface BaseEntity {
    id: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}
