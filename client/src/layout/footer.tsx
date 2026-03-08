export const Footer = () => {
  return (
    <footer className={[
      "bg-(--bg-section) rounded-t-2xl",
      "flex p-4",
    ].join(" ")}>
      <div className="flex flex-col justify-between">
        <div>
          <p>© D1makryt</p>
        </div>

        <div>
          <p>© The Void Community</p>
        </div>
      </div>
    </footer>
  );
};
