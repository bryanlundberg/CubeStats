import { useEffect, useState } from "react";
import { useTimerStore } from "@/store/timerStore";
import { getAllCubes, saveCube } from "@/db/dbOperations";
import { Cube } from "@/interfaces/Cube";
import { useRouter } from "@/i18n/routing";

export function useCubes() {
  const { cubes, setSelectedCube, setNewScramble, setCubes } = useTimerStore();
  const [filterCubes, setFilterCubes] = useState(cubes);
  const router = useRouter();
  const handleSearchFilter = (searchCube: string) => {
    if (!cubes) return;
    if (searchCube.trim() === "") return setFilterCubes(cubes);
    setFilterCubes(
      cubes.filter((cube: Cube) =>
        cube.name.toLowerCase().startsWith(searchCube.toLowerCase())
      )
    );
  };

  const handleFavoriteClick = async (cubeId: string) => {
    try {
      const editingCube = cubes?.find((i) => i.id === cubeId);

      if (!editingCube) return;

      await saveCube({
        ...editingCube,
        favorite: !editingCube.favorite,
      });

      const loadCubes = await getAllCubes();
      setCubes(loadCubes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectToTimer = (cubeId: string) => {
    const clickedCube = cubes?.find((i) => i.id === cubeId);

    // If the cube does not exist, do nothing
    if (!clickedCube) {
      return;
    }

    setSelectedCube({ ...clickedCube });
    setNewScramble(clickedCube);
    return router.push("/");
  };

  useEffect(() => {
    getAllCubes().then((res) => setFilterCubes(res));
  }, [cubes]);

  return {
    filterCubes,
    handleSearchFilter,
    handleFavoriteClick,
    handleRedirectToTimer,
  };
}
