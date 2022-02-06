import React from "react";
import Navbar from "../../components/Navbar/Navbar";


const About = () => {
  return (
    <>
      <Navbar />
      <div className="pb-16">
        <div>
          <div className="container mx-auto pt-16">
            <div className="w-11/12 xl:w-2/3 lg:w-2/3 md:w-2/3 mx-auto sm:mb-10 mb-16">
              <h1 className="focus:outline-none xl:text-5xl md:text-3xl text-xl text-center text-gray-800 font-extrabold mb-5 pt-4">
                Legalistica
              </h1>
              <p className="focus:outline-none text-base md:text-lg lg:text-xl text-center text-gray-600 font-normal xl:w-10/12 xl:mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique sit eos fugiat maxime sequi assumenda omnis vel rem
                repellat, perferendis sunt expedita sint error quia aliquam
                dolorem hic fugit voluptatem, culpa voluptas quae? Vel labore
                soluta sapiente assumenda, magnam porro officia reprehenderit
                sequi officiis sed laboriosam dolore aspernatur voluptas quam
                saepe explicabo pariatur blanditiis optio quaerat aut aliquam
                corporis! Dolore modi atque similique eligendi amet, deleniti
                ipsam sed quod, alias dicta qui fugit, odio iusto odit eveniet
                distinctio voluptate natus provident omnis. Reiciendis
                laboriosam rem doloribus consequatur blanditiis autem beatae
                velit. Et, iure laborum eum totam voluptas dolorum eos non!.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
