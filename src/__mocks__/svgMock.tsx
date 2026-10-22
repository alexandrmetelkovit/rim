import type { SVGProps } from 'react';

const SvgMock = (props: SVGProps<SVGSVGElement>) => {
  return <svg {...props} />;
};

export default SvgMock;
