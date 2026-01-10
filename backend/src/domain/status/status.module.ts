import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {StatusEntity} from './entities/status.entity';
import {StatusController} from './status.controller';
import {StatusService} from './status.service';

@Module({
    controllers: [StatusController],
    providers: [StatusService],
    exports: [TypeOrmModule.forFeature([StatusEntity])]
})
export class StatusModule {}
