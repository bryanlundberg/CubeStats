import InputText from "./InputText";
import CheckboxImage from "./CheckboxImage";
import { Categories } from "@/interfaces/Categories";
import { cubeCollection } from "@/lib/cubeCollection";
import genId from "@/lib/genId";
import { useCubesModalStore } from "@/store/CubesModalStore";
import createCube from "@/lib/createCube";
import { useTimerStore } from "@/store/timerStore";
import loadCubes from "@/lib/loadCubes";
import translation from "@/translations/global.json";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useState } from "react";

export default function ModalCreate() {
  const {
    setModalOpen,
    editingCube,
    setEditingCube,
    selectedCategory,
    setSelectedCategory,
    cubeName,
    setCubeName,
  } = useCubesModalStore();
  const { lang } = useSettingsModalStore();
  const { setCubes } = useTimerStore();
  const [error, setError] = useState<boolean>(false);

  const handleClickRadio = (category: Categories) => {
    setSelectedCategory(category);
  };

  const handleWriteCubeName = (newText: string) => {
    if (newText.trim().length > 0) setError(false);
    setCubeName(newText);
  };

  const handleCreateCube = (name: string, category: Categories) => {
    if (name.trim() === "") {
      setError(true);
      return;
    }
    const newCubes = createCube({
      cubeName: name,
      category: category,
    });
    setCubes(newCubes);
    setModalOpen(false);
    setEditingCube(null);
    setCubeName("");
    setSelectedCategory("2x2");
  };

  const handleEditCube = (name: string, category: Categories) => {
    if (name === "") return;
    if (!editingCube) return;
    const cubeDB = loadCubes();

    for (const cube of cubeDB) {
      if (cube.id === editingCube.id) {
        cube.name = name;
        cube.category = category;
      }
    }

    window.localStorage.setItem("cubes", JSON.stringify(cubeDB));
    setCubes(cubeDB);
    setModalOpen(false);
    setEditingCube(null);
    setCubeName("");
    setSelectedCategory("2x2");
  };

  const handleDeleteCube = () => {
    const cubeDB = loadCubes();
    if (!editingCube) return;
    const updatedCubeDB = cubeDB.filter((cube) => cube.id !== editingCube.id);
    window.localStorage.setItem("cubes", JSON.stringify(updatedCubeDB));
    setCubes(updatedCubeDB);
    setModalOpen(false);
    setEditingCube(null);
    setCubeName("");
    setSelectedCategory("2x2");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCube(null);
    setCubeName("");
    setSelectedCategory("2x2");
  };

  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        tabIndex={2}
        aria-hidden={false}
        className={`fixed backdrop-blur-[2px] top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen flex flex-col items-center`}
        onClick={() => setModalOpen(false)}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative border rounded-lg bg-neutral-200 border-neutral-800">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between gap-3 p-4 border-b rounded-t border-neutral-800">
              <h3 className="flex items-center justify-center w-32 h-8 text-sm font-semibold text-neutral-950">
                {editingCube
                  ? translation.cubes.modal["title-editing"][lang]
                  : translation.cubes.modal["title-creating"][lang]}
              </h3>
              <div className="flex flex-col w-full">
                <InputText
                  placeholder={
                    translation.inputs.placeholders["modal-cubes"][lang]
                  }
                  onChange={handleWriteCubeName}
                  value={cubeName}
                  focus={true}
                  className={`bg-neutral-200 focus:bg-neutral-100 text-neutral-900 border border-neutral-300`}
                />
                {error && (
                  <p className="px-2 mt-2 text-sm text-red-600">
                    {translation.cubes.modal["error-name"][lang]}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 transition duration-200 bg-transparent rounded-lg hover:text-gray-900"
                data-modal-hide="defaultModal"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">
                  {translation.inputs["cancel"][lang]}
                </span>
              </button>
            </div>
            {/* <!-- Modal body --> */}

            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
              {cubeCollection.map((category) => {
                return (
                  <CheckboxImage
                    key={genId()}
                    src={category.src}
                    alt={category.name}
                    id={category.id}
                    value={category.name}
                    handleClickRadio={handleClickRadio}
                    selectedCategory={selectedCategory}
                  />
                );
              })}
            </div>

            <div className="px-6 text-sm text-neutral-800">
              {translation.cubes.modal["current-select"][lang]}{" "}
              {selectedCategory}
            </div>

            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-end p-6 mt-2 space-x-2 border-t rounded-b border-zinc-800">
              {editingCube ? (
                <button
                  onClick={handleDeleteCube}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-neutral-950 border border-zinc-800 bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {translation.inputs["delete"][lang]}
                </button>
              ) : null}
              {!editingCube ? (
                <button
                  onClick={handleCloseModal}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-neutral-800 transition duration-300 bg-neutral-200 hover:bg-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {translation.inputs["cancel"][lang]}
                </button>
              ) : null}

              <button
                onClick={() =>
                  editingCube
                    ? handleEditCube(cubeName, selectedCategory)
                    : handleCreateCube(cubeName, selectedCategory)
                }
                data-modal-hide="defaultModal"
                type="button"
                className="border border-zinc-800 bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-neutral-950"
              >
                {editingCube
                  ? translation.inputs["save"][lang]
                  : translation.inputs["create"][lang]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
