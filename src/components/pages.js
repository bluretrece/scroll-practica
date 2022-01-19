import React from 'react';
import { Dom, useLoader } from 'react-three-fiber';
import { TextureLoader, LinearFilter } from 'three';
import { Block, useBlock } from '../blocks';
import state from '../store';
import Plane from './plane';
import Cube from './cube';

function Content({ left, children, map }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color="#bfe2ca" map={map} />
      {children}
    </group>
  );
}

function Stripe() {
  const { contentMaxWidth } = useBlock();
  return <Plane scale={[100, contentMaxWidth, 1]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} color="#555555" />;
}

export default function Pages() {
  const textures = useLoader(TextureLoader, state.images);
  console.log({ textures });

  const [img1, img2, img3] = textures.map((texture) => {
    texture.minFilter = LinearFilter;
    return texture;
  });
  const { contentMaxWidth: w, canvasHeight, mobile } = useBlock();
  const aspect = 1.75;

  const pixelWidth = w * state.zoom;

  return (
    <>
      <Block factor={0} offset={0}>
        <Cube position={[w / 2, canvasHeight / 2 - 1, 2]}></Cube>
      </Block>

      <Block factor={1.5} offset={0}>
        <Content left map={img1}>
          <Dom style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: 'left' }} position={[-w / 2, -w / 2 / aspect - 0.4, 1]}>
            Imagen 1 con descripcion
          </Dom>
        </Content>
      </Block>
      
      <Block factor={2.0} offset={1}>
        <Content map={img2} style={{ zIndex: 100 }}>
          <Dom
            prepend={false}
            style={{
              zIndex: 100,
              width: pixelWidth / (mobile ? 1 : 2),
              textAlign: 'right',
            }}
            position={[mobile ? -w / 2 : 0, -w / 2 / aspect - 0.4, 1]}
          >
            Imagen 2 con descripcion
          </Dom>
        </Content>
      </Block>
      {/* Stripe */}
      <Block factor={-1.0} offset={1}>
        <Stripe />
      </Block>

      <Block factor={1.5} offset={2}>
        <Content left map={img3}>
          <Dom prepend style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: 'left' }} position={[-w / 2, -w / 2 / aspect - 0.4, 1]}>
            Imagen 3 con descripcion
          </Dom>
        </Content>
      </Block>
    </>
  );
}
