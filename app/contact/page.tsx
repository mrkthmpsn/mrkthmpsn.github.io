"use client";
import PageWrapper from "@/components/pageWrapper";

import markdown from "./contact.md";

const ContactPage = () => {
  return (
    <PageWrapper
      pageTitle={"Contact"}
      pageMarkdown={markdown}
      isCategoryPage={true}
    />
  );
};

export default ContactPage;
