import { ModeToggle } from "../ToggleTheme";

const Navbar = () => {
  return (
    <div>
      <div className=" container py-4 mx-auto flex justify-between items-center">
        <div>
          <img
            className=" w-44 dark:invert "
            src="/the-book-hive-logo.png"
            alt=""
          />
        </div>

        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
