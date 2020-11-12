import * as React from "react";

let DefList: React.FunctionComponent<{
  onChange?: (paths: string[]) => any;
  defaultValue: string;
}> = ({ onChange, defaultValue }) => {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);

  const handleChange = React.useCallback(
    function handleChange() {
      try {
        let services =
          ref.current?.value?.replace(/\n\r?/g, ",")?.split(",") ?? [];
        services = services.filter((s) => !!s.trim());

        console.log(services);

        onChange?.(services);
      } catch (error) {
        console.error("parse failed");
        onChange?.([]);
      }
    },
    [onChange]
  );

  return (
    <>
      <h3 className="h-def">List of definitions</h3>
      <textarea
        className="def-list"
        ref={ref}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </>
  );
};

export default DefList;
