import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../dto/page.dto";
export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export const ApiPaginatedResponse = <TModel extends Type>(model: TModel) => {
return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
    description: "Successfully received model list",
    schema: {
        allOf: [
        { $ref: getSchemaPath(PageDto) },
        {
            properties: {
            data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
            },
            },
        },
        ],
    },
    })
);
};
