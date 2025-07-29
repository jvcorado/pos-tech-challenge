import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

type UploadDocumentProps = {
  onFileSelected: (file: File) => void;
  selectedFile?: File | null;
};

export default function UploadDocument({
  onFileSelected,
  selectedFile,
}: UploadDocumentProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`max-w-[250px] p-4 border-2 border-dashed rounded-lg cursor-pointer transition 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-white"}`}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-gray-700">
        {isDragActive
          ? "Solte o arquivo aqui..."
          : "Arraste ou clique para adicionar um documento (PDF ou imagem)"}
      </p>

      {selectedFile && (
        <p className="mt-2 text-sm text-gray-800">
          <strong>Selecionado:</strong> {selectedFile.name}
        </p>
      )}
    </div>
  );
}
