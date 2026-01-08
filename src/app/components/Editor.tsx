// // src/app/components/Editor.tsx
// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Undo, Redo } from "lucide-react";
// import { Button } from "@/components/ui/button"; // We'll create this next
// import { Toggle } from "@/components/ui/toggle";
// import { Separator } from "@/components/ui/separator";

// const MenuBar = ({ editor }: { editor: any }) => {
//   if (!editor) return null;

//   return (
//     <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-300 bg-gray-50 sticky top-0 z-10">
//       <Toggle
//         size="sm"
//         pressed={editor.isActive("bold")}
//         onPressedChange={() => editor.chain().focus().toggleBold().run()}
//       >
//         <Bold className="h-4 w-4" />
//       </Toggle>

//       <Toggle
//         size="sm"
//         pressed={editor.isActive("italic")}
//         onPressedChange={() => editor.chain().focus().toggleItalic().run()}
//       >
//         <Italic className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="h-8" />

//       <Toggle
//         size="sm"
//         pressed={editor.isActive("heading", { level: 1 })}
//         onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//       >
//         <Heading1 className="h-4 w-4" />
//       </Toggle>

//       <Toggle
//         size="sm"
//         pressed={editor.isActive("heading", { level: 2 })}
//         onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//       >
//         <Heading2 className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="h-8" />

//       <Toggle
//         size="sm"
//         pressed={editor.isActive("bulletList")}
//         onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
//       >
//         <List className="h-4 w-4" />
//       </Toggle>

//       <Toggle
//         size="sm"
//         pressed={editor.isActive("orderedList")}
//         onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
//       >
//         <ListOrdered className="h-4 w-4" />
//       </Toggle>

//       <Separator orientation="vertical" className="h-8" />

//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//       >
//         <Undo className="h-4 w-4" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//       >
//         <Redo className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// };

// export default function Editor() {
//  const editor = useEditor({
//   extensions: [StarterKit],
//   content: `
//     <h1>Sample Legal Document</h1>
//     <p>Dear Sir/Madam,</p>
//     <p>This is a sample cover letter drafted for demonstration purposes. As you type, the content will flow naturally across pages in the next phase.</p>
//     <ul>
//       <li>Support for bullet points</li>
//       <li>Bold, italic, and headings</li>
//       <li>Real-time formatting</li>
//     </ul>
//     <p>Start typing below to test the editor...</p>
//   `,
//   immediatelyRender: false,  // ← This fixes the SSR/hydration error
//   editorProps: {
//     attributes: {
//       class: "prose prose-lg max-w-none focus:outline-none min-h-screen p-12",
//     },
//   },
// });
//  if (!editor) {
//   return (
//     <div className="flex flex-col h-screen bg-white">
//       <MenuBar editor={null} /> {/* Menu will be hidden since editor is null */}
//       <div className="flex-1 overflow-y-auto p-12 prose prose-lg max-w-none">
//         Loading editor...
//       </div>
//     </div>
//   );
// }

// return (
//   <div className="flex flex-col h-screen bg-white">
//     <MenuBar editor={editor} />
//     <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
//   </div>
// );}


// src/app/components/Editor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pagination } from "tiptap-pagination-breaks"; // ← New import
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Undo, Redo, Printer } from "lucide-react"; // Added Printer for later
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-300 bg-gray-50 sticky top-0 z-10">
      <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle size="sm" pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-8" />

      <Toggle size="sm" pressed={editor.isActive("heading", { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 className="h-4 w-4" />
      </Toggle>

      <Toggle size="sm" pressed={editor.isActive("heading", { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-8" />

      <Toggle size="sm" pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle size="sm" pressed={editor.isActive("orderedList")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-8" />

      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo className="h-4 w-4" />
      </Button>

      {/* Print Preview button placeholder - we'll implement in Phase 4 */}
      <Separator orientation="vertical" className="h-8" />
      <Button variant="outline" size="sm">
        <Printer className="h-4 w-4 mr-2" />
        Print Preview
      </Button>
    </div>
  );
};

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Pagination.configure({
        pageHeight: 1056,   // 11 inches at 96 DPI
        pageWidth: 816,     // 8.5 inches at 96 DPI
        pageMargin: 96,     // 1 inch all sides
        // Optional: add page numbers later if time allows
      }),
    ],
    content: `
      <h1>Cover Letter for USCIS Petition</h1>
      <p>Dear Officer,</p>
      <p>This is a multi-page legal document demonstration. Type a lot of text (or paste lorem ipsum) to see automatic page breaks appear dynamically.</p>
      <p>Add headings, bold text, lists — pagination will reflow in real-time.</p>
      <ul>
        <li>Real-time page breaks</li>
        <li>Matches print layout</li>
        <li>Professional formatting</li>
      </ul>
      <p>Keep typing to fill pages...</p>
    `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-screen px-24 py-24", // Adjusted padding to simulate margins visually
      },
    },
    onUpdate: () => {
      // Optional: force re-calculation on content change (extension handles this automatically)
    },
  });

  if (!editor) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="p-3 border-b bg-gray-50">Loading editor...</div>
        <div className="flex-1 p-12 prose prose-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="flex-1 overflow-y-auto bg-gray-50" />
    </div>
  );
}