'use client';

import { Button } from '@/components/ui/button';
import {
  addEdge,
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
  Edge,
  Node,
  useReactFlow,
  EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTheme } from 'next-themes';
import { useCallback, useState } from 'react';

// Custom node component
const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className='custom-node p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 hover:border-gray-500 dark:border-gray-700'>
      <Handle type='target' position={Position.Top} />
      <div className='text-sm font-medium text-gray-900 dark:text-white'>
        {data.label}
      </div>
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

// Custom edge component with plus button
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
}: EdgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addNodes, addEdges, deleteElements } = useReactFlow();

  const addNodeBetween = () => {
    const newNode: Node = {
      id: `new-${id}`,
      position: {
        x: (sourceX + targetX) / 2,
        y: (sourceY + targetY) / 2,
      },
      data: { label: 'New Node' },
      type: 'custom',
    };

    const newEdges: Edge[] = [
      { id: `${id}-1`, source: id.split('-')[0], target: newNode.id },
      { id: `${id}-2`, source: newNode.id, target: id.split('-')[1] },
    ];

    addNodes(newNode);
    addEdges(newEdges);
    deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      <path
        d={`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`}
        fill='none'
        stroke='#b1b1b7'
        strokeWidth={2}
        className='react-flow__edge-path'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <foreignObject
          width={20}
          height={20}
          x={(sourceX + targetX) / 2 - 10}
          y={(sourceY + targetY) / 2 - 10}
          requiredExtensions='http://www.w3.org/1999/xhtml'
        >
          <div
            className='flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600'
            onClick={addNodeBetween}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='white'
              className='w-4 h-4'
            >
              <path
                fillRule='evenodd'
                d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </foreignObject>
      )}
    </>
  );
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: (
        <div className='md:space-y-2'>
          <p>When...</p>
          <Button variant={'secondary'}>Шинэ автоматжуулалт</Button>
        </div>
      ),
    },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Default Node' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { theme } = useTheme();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    default: CustomEdge,
  };

  return (
    <div className='w-full h-screen'>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        colorMode={theme as 'light' | 'dark'}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        preventScrolling
      >
        <Background
          variant='dots'
          color={theme === 'dark' ? '#333' : '#ddd'}
          gap={16}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}
