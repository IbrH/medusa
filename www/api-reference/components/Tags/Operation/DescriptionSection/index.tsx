import type { Operation } from "@/types/openapi"
import type { TagsOperationDescriptionSectionSecurityProps } from "./Security"
import type { TagsOperationDescriptionSectionRequestProps } from "./Request"
import type { TagsOperationDescriptionSectionResponsesProps } from "./Responses"
import dynamic from "next/dynamic"
import Loading from "@/components/Loading"

const TagsOperationDescriptionSectionSecurity =
  dynamic<TagsOperationDescriptionSectionSecurityProps>(
    async () => import("./Security"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagsOperationDescriptionSectionSecurityProps>

const TagsOperationDescriptionSectionRequest =
  dynamic<TagsOperationDescriptionSectionRequestProps>(
    async () => import("./Request"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagsOperationDescriptionSectionRequestProps>

const TagsOperationDescriptionSectionResponses =
  dynamic<TagsOperationDescriptionSectionResponsesProps>(
    async () => import("./Responses"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagsOperationDescriptionSectionResponsesProps>

type TagsOperationDescriptionSectionProps = {
  operation: Operation
}
const TagsOperationDescriptionSection = ({
  operation,
}: TagsOperationDescriptionSectionProps) => {
  return (
    <>
      <h3>{operation.summary}</h3>
      <p>{operation.description}</p>
      {operation.security && (
        <TagsOperationDescriptionSectionSecurity
          security={operation.security}
        />
      )}
      {operation.requestBody && (
        <TagsOperationDescriptionSectionRequest
          requestBody={operation.requestBody}
        />
      )}
      <TagsOperationDescriptionSectionResponses
        responses={operation.responses}
      />
    </>
  )
}

export default TagsOperationDescriptionSection
