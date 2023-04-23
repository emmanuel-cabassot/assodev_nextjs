import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState, useContext, useEffect } from 'react';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { Box } from '@mui/system';
import ReactQuill, { Quill } from 'react-quill';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const CustomImage = function (quill: any, options: any) {
  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('image', () => {
    const url = prompt('Entrez l\'URL de l\'image :');
    if (url) {
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'image', url);
      quill.setSelection(range.index + 1);
    }
  });
};

Quill.register('modules/customImage', CustomImage);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  customImage: true,
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default function DescriptionStep() {
  const { saveDescription, description, VerifyIsCompleteForm } = useContext(CreateProjectFormContext);

  const handleDescriptionSendToContext = (e: string) => {
    saveDescription(e);
    VerifyIsCompleteForm();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '780px' }}>
        <QuillNoSSRWrapper
          value={description}
          onChange={handleDescriptionSendToContext}
          placeholder="Description"
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </Box>
    </Box>
  );
}
