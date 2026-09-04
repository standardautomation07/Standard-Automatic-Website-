import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumb({ trail, tone = "light" }: { trail: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-steel-400" : "text-steel-500";
  const current = tone === "dark" ? "text-white" : "text-steel-900";

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.7rem] ${muted}`}>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              )}
              {isLast ? (
                <span className={current} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="underline-offset-4 hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
