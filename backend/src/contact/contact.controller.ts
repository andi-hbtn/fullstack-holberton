import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ServiceHandler } from 'src/errorHandler/service.error';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    public async send(@Body() bodyParam: ContactDto): Promise<any> {
        try {
            const result = await this.contactService.sendEmail(bodyParam);
            return result;
        } catch (error) {
            throw new ServiceHandler(error.response, error.status);
        }
    }
}
