import { Metadata } from "next"
import InfoPageTemplate from "@modules/common/templates/info-page-template"
import pageData from "@modules/common/templates/info-page-template/content/fast-shipping"

export const metadata: Metadata = {
    title: pageData.seo?.metaTitle ?? pageData.title,
    description: pageData.seo?.metaDescription ?? pageData.intro,
}

export default function FastShippingPage() {
    return <InfoPageTemplate page={pageData} />
}
