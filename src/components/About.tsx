export default function About() {
  return (
    <div className="container mx-auto px-10 pt-20 pb-20 bg-amber-100 dark:bg-[#1E201E] dark:text-[#ECDFCC] font-lora">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-[#ECDFCC] text-center">
        Hi, I'm Henry.
        <br className="hidden lg:inline-block" />
      </h1>
      <p className="mb-8 leading-relaxed">
        {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum
        quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum,
        voluptas natus? */}
      </p>
      <div className="flex justify-center">
        <a
          href="https://www.linkedin.com/in/henry-wertz-09938b178/"
          className="inline-flex dark:text-[#ECDFCC] bg-[#697565] border-0 py-2 px-6 focus:outline-none hover:bg-[#6f7c6a] rounded text-lg"
        >
          Work With Me
        </a>
        <a
          href="https://github.com/henrywertz6"
          className="ml-4 inline-flex dark:text-[#ECDFCC] bg-[#3C3D37] border-0 py-2 px-6 focus:outline-none hover:bg-[#44463f] rounded text-lg"
        >
          See My Past Work
        </a>
      </div>
      <div></div>
    </div>
  );
}
