import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'MBT Connection — строительство и проектирование ВОЛС';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', color: 'white', background: 'linear-gradient(135deg, #061827 0%, #0b5483 70%, #1384bf 100%)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-4px' }}>MBT</span><span style={{ fontSize: 22, letterSpacing: '8px' }}>CONNECTION</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}><span style={{ fontSize: 49, fontWeight: 700, lineHeight: 1.08 }}>Волоконно-оптические линии связи</span><span style={{ fontSize: 28, color: '#bceeff' }}>Проектирование · Строительство · Сервис</span></div>
    </div>, size
  );
}
