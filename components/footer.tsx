import { Footer } from "flowbite-react";

export const WeddingFooter = (props: any) => {
  return (
    <Footer container style={{ zIndex: 2 }} theme={{
      root: {
        "base": "w-full  bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
        "container": "w-full p-6",
        "bgDark": "bg-gray-800"
      }
    }}>
      <Footer.Copyright by="Tiago Pinto" year={2024} href="https://github.com/tiagopinto97" />
    </Footer>
  );
}
