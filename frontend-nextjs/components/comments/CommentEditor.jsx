import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import Image from '@tiptap/extension-image';
import { useCallback, useRef, useState } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import api from '../../services/api'; // Authenticated API for getting URL
import axios from 'axios'; // Clean axios for PUT to signed URL

const CommentEditor = ({ onSubmit, availableUsers }) => {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
                suggestion: {
                    items: ({ query }) => {
                        return availableUsers
                            .filter(user => user.name.toLowerCase().startsWith(query.toLowerCase()))
                            .map(user => user.name)
                            .slice(0, 5);
                    },
                    render: () => {
                        let component;
                        let popup;

                        return {
                            onStart: (props) => {
                                const el = document.createElement('div');
                                el.className = 'bg-white border rounded shadow-lg p-2';

                                props.items.forEach((item, index) => {
                                    const btn = document.createElement('button');
                                    btn.className = `block w-full text-left px-2 py-1 hover:bg-gray-100 ${index === props.command.selectedIndex ? 'bg-blue-50' : ''}`;
                                    btn.textContent = item;
                                    btn.onclick = () => props.command({ id: item });
                                    el.appendChild(btn);
                                });

                                popup = tippy('body', {
                                    getReferenceClientRect: props.clientRect,
                                    appendTo: () => document.body,
                                    content: el,
                                    showOnCreate: true,
                                    interactive: true,
                                    trigger: 'manual',
                                    placement: 'bottom-start',
                                });
                            },
                            onUpdate: (props) => {
                                if (popup) {
                                    popup[0].setProps({
                                        getReferenceClientRect: props.clientRect,
                                    });
                                }
                            },
                            onKeyDown: (props) => {
                                if (props.event.key === 'Escape') {
                                    popup[0].hide();
                                    return true;
                                }
                                return false;
                            },
                            onExit: () => {
                                if (popup) {
                                    popup[0].destroy();
                                }
                            },
                        };
                    },
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm w-full max-w-none focus:outline-none min-h-[100px] p-2 border rounded',
            },
        },
        content: '',
    });

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);

            // 1. Get Upload URL from Backend
            const { data } = await api.post('/api/v1/storage/upload-url', {
                fileName: file.name,
                contentType: file.type
            });

            // 2. Upload file to the generated URL
            // Note: In local env, this URL is http://localhost:8080/api/v1/storage/upload/...
            // In prod, it is a Google Cloud Storage Signed URL.
            // We use standard axios without auth headers for the signed URL (unless local needs it, but we set permitAll)
            await axios.put(data.url, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

            // 3. Insert Image into Editor
            // For local storage, we know the public URL convention
            // In a real generic implementation, the backend should return the publicUrl alongside the uploadUrl
            // For now, we assume local convention:
            const publicUrl = `${api.defaults.baseURL}/api/v1/storage/download/${file.name}`;

            editor.chain().focus().setImage({ src: publicUrl }).run();

        } catch (error) {
            console.error("Upload failed", error);
            alert("Falha no upload da imagem. Tente novamente.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = useCallback(() => {
        if (editor) {
            const html = editor.getHTML();
            if (editor.getText().trim() || html.includes('<img')) {
                onSubmit(html);
                editor.commands.clearContent();
            }
        }
    }, [editor, onSubmit]);

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />

            <div className="border border-gray-200 rounded-md bg-white">
                <div className="flex gap-2 p-2 border-b bg-gray-50">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}>B</button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}>I</button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}>List</button>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-1 text-gray-500 hover:bg-gray-200 rounded ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Upload Imagem"
                        disabled={isUploading}
                    >
                        {isUploading ? '...' : '📎'}
                    </button>
                </div>
                <EditorContent editor={editor} className="p-2" />
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isUploading ? 'Enviando...' : 'Comentar'}
                </button>
            </div>
        </div>
    );
};

export default CommentEditor;
