import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'
import { useState, useContext } from 'react'
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { Box } from '@mui/system';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
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
]

export default function DescriptionStep() {

    const { saveDescription, description } = useContext(CreateProjectFormContext);

    const [value, setValue] = useState()

    // attention normarlement on set une value (e.target.value) mais grace à react quill (e) suffit
    const handleDescriptionSendToContext = (e: any) => {
        setValue(e)
        saveDescription(e)
    }

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
    )
}