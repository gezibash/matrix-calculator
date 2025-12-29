import { Calculator } from "@/components/calculator";
import { MatrixRain } from "@/components/matrix-rain";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      {/* Matrix digital rain background */}
      <MatrixRain />
      {/* Calculator with elevated z-index */}
      <div className="relative z-10">
        <Calculator />
      </div>
    </div>
  );
}
