import {Heading2, Paragraph} from '@/shared/ui';

type PageIndicatorProps = {
    pageName: string;
    pageDescription?: string;
};

const PageIndicator = ({
    pageName = 'Home',
    pageDescription = 'Monitor all your tasks'
}: PageIndicatorProps) => {
    return (
        <div>
            <Heading2>{pageName}</Heading2>
            <Paragraph>{pageDescription}</Paragraph>
        </div>
    );
};

export {PageIndicator, type PageIndicatorProps};
