require('@google-cloud/debug-agent').start();
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { SendController } from './send.controller';
import { AppService } from './app.service';
import { SendService } from './send.service';
import { LmpApiService } from './services/LMP-API.service';
import { InfluencerAPIService } from './services/influerncer-api.service';
import { OutboundChannelsAPIService } from './services/outbound-channels-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from './campaign.schema';
import { CommunicationSchema, CampaignEngagementSchema } from './campaign-engagement.schema';

@Module({
  imports: [HttpModule,
            MongooseModule.forRoot('mongodb://sampling:Nelson99!@gdprcluster-shard-00-00-xwjia.gcp.mongodb.net:27017,gdprcluster-shard-00-01-xwjia.gcp.mongodb.net:27017,gdprcluster-shard-00-02-xwjia.gcp.mongodb.net:27017/sampling?ssl=true&replicaSet=GDPRcluster-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser : false, autoIndex: false }),
            MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }]),
            MongooseModule.forFeature([{ name: 'Communication', schema: CommunicationSchema }]),
            MongooseModule.forFeature([{ name: 'CampaignEngagement', schema: CampaignEngagementSchema }])],
  controllers: [AppController, SendController],
  providers: [AppService, SendService, LmpApiService, InfluencerAPIService, OutboundChannelsAPIService  ],
})
export class AppModule {}
